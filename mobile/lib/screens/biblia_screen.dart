import 'package:flutter/material.dart';
import '../models/biblia_models.dart';
import '../services/api_service.dart';
import '../widgets/versiculo_card.dart';

class BibliaScreen extends StatefulWidget {
  const BibliaScreen({super.key});

  @override
  State<BibliaScreen> createState() => _BibliaScreenState();
}

enum _Nivel { testamentos, livros, capitulos, versiculos }

class _BibliaScreenState extends State<BibliaScreen> {
  final ApiService _api = apiService;

  _Nivel _nivel = _Nivel.testamentos;
  bool _carregando = true;
  String? _erro;

  List<Testamento> _testamentos = [];
  List<Livro> _livros = [];
  List<int> _capitulos = [];
  List<Versiculo> _versiculos = [];

  Testamento? _testamentoSelecionado;
  Livro? _livroSelecionado;
  int? _capituloSelecionado;

  @override
  void initState() {
    super.initState();
    _carregarTestamentos();
  }

  Future<void> _carregarTestamentos() async {
    setState(() {
      _carregando = true;
      _erro = null;
      _nivel = _Nivel.testamentos;
    });
    try {
      final dados = await _api.getTestamentos();
      setState(() {
        _testamentos = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  Future<void> _carregarLivros(Testamento t) async {
    setState(() {
      _carregando = true;
      _erro = null;
      _testamentoSelecionado = t;
      _nivel = _Nivel.livros;
    });
    try {
      final dados = await _api.getLivros(testamentoId: t.id);
      setState(() {
        _livros = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  Future<void> _carregarCapitulos(Livro livro) async {
    setState(() {
      _carregando = true;
      _erro = null;
      _livroSelecionado = livro;
      _nivel = _Nivel.capitulos;
    });
    try {
      final caps = await _api.getCapitulos(livro.id);
      setState(() {
        _capitulos = caps.map((c) => c.numero).toList();
        if (_capitulos.isEmpty && livro.capitulos != null) {
          _capitulos = List<int>.generate(livro.capitulos!, (i) => i + 1);
        }
        _carregando = false;
      });
    } catch (e) {
      final total = livro.capitulos ?? 0;
      setState(() {
        _capitulos = List<int>.generate(total, (i) => i + 1);
        _carregando = false;
      });
    }
  }

  Future<void> _carregarVersiculos(int capitulo) async {
    if (_livroSelecionado == null) return;
    setState(() {
      _carregando = true;
      _erro = null;
      _capituloSelecionado = capitulo;
      _nivel = _Nivel.versiculos;
    });
    try {
      final dados = await _api.getVersiculos(_livroSelecionado!.id, capitulo);
      setState(() {
        _versiculos = dados;
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _erro = e.toString();
        _carregando = false;
      });
    }
  }

  void _voltar() {
    switch (_nivel) {
      case _Nivel.livros:
        _carregarTestamentos();
        break;
      case _Nivel.capitulos:
        if (_testamentoSelecionado != null) _carregarLivros(_testamentoSelecionado!);
        break;
      case _Nivel.versiculos:
        if (_livroSelecionado != null) _carregarCapitulos(_livroSelecionado!);
        break;
      case _Nivel.testamentos:
        break;
    }
  }

  String get _titulo {
    switch (_nivel) {
      case _Nivel.testamentos:
        return 'Biblia';
      case _Nivel.livros:
        return _testamentoSelecionado?.nome ?? 'Livros';
      case _Nivel.capitulos:
        return _livroSelecionado?.nome ?? 'Capitulos';
      case _Nivel.versiculos:
        return '${_livroSelecionado?.nome ?? ''} $_capituloSelecionado';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_titulo),
        leading: _nivel != _Nivel.testamentos
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: _voltar,
              )
            : null,
      ),
      body: _carregando
          ? const Center(child: CircularProgressIndicator())
          : _erro != null
              ? _buildErro()
              : _buildConteudo(),
    );
  }

  Widget _buildErro() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.cloud_off, size: 48),
          const SizedBox(height: 12),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              _erro!,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 14),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(onPressed: _voltar, child: const Text('Tentar novamente')),
        ],
      ),
    );
  }

  Widget _buildConteudo() {
    switch (_nivel) {
      case _Nivel.testamentos:
        return ListView.builder(
          itemCount: _testamentos.length,
          itemBuilder: (context, i) {
            final t = _testamentos[i];
            return ListTile(
              title: Text(t.nome, style: const TextStyle(fontFamily: 'serif', fontSize: 18)),
              subtitle: Text(t.abreviacao ?? ''),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => _carregarLivros(t),
            );
          },
        );
      case _Nivel.livros:
        return ListView.builder(
          itemCount: _livros.length,
          itemBuilder: (context, i) {
            final l = _livros[i];
            return ListTile(
              title: Text(l.nome, style: const TextStyle(fontFamily: 'serif', fontSize: 17)),
              subtitle: l.abreviacao != null ? Text(l.abreviacao!) : null,
              trailing: const Icon(Icons.chevron_right),
              onTap: () => _carregarCapitulos(l),
            );
          },
        );
      case _Nivel.capitulos:
        return GridView.builder(
          padding: const EdgeInsets.all(12),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 5,
            childAspectRatio: 1,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
          ),
          itemCount: _capitulos.length,
          itemBuilder: (context, i) {
            final n = _capitulos[i];
            return InkWell(
              onTap: () => _carregarVersiculos(n),
              borderRadius: BorderRadius.circular(8),
              child: Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Theme.of(context).dividerColor),
                ),
                child: Text(
                  '$n',
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
              ),
            );
          },
        );
      case _Nivel.versiculos:
        if (_versiculos.isEmpty) {
          return const Center(child: Text('Nenhum versiculo encontrado.'));
        }
        return ListView.builder(
          itemCount: _versiculos.length,
          itemBuilder: (context, i) {
            return VersiculoCard(
              versiculo: _versiculos[i],
              onFavorito: () => _toggleFavorito(_versiculos[i]),
              onNota: () => _abrirNota(_versiculos[i]),
            );
          },
        );
    }
  }

  Future<void> _toggleFavorito(Versiculo v) async {
    final ref = v.referencia ??
        '${_livroSelecionado?.nome ?? ''} ${_capituloSelecionado}:${v.numero}';
    try {
      await _api.adicionarFavorito(ref, v.texto);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Versiculo $ref adicionado aos favoritos.')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro: $e')),
        );
      }
    }
  }

  void _abrirNota(Versiculo v) {
    final controller = TextEditingController();
    final ref = v.referencia ??
        '${_livroSelecionado?.nome ?? ''} ${_capituloSelecionado}:${v.numero}';
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Nota - $ref'),
        content: TextField(
          controller: controller,
          maxLines: 5,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'Escreva sua nota...',
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancelar')),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              try {
                await _api.adicionarFavorito(ref, v.texto, nota: controller.text);
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Nota salva.')),
                  );
                }
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erro: $e')),
                  );
                }
              }
            },
            child: const Text('Salvar'),
          ),
        ],
      ),
    );
  }
}
