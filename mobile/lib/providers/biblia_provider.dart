import 'package:flutter/material.dart';

import '../models/livro.dart';
import '../models/versiculo.dart';
import '../services/biblia_service.dart';

class BibliaProvider extends ChangeNotifier {
  final BibliaService _bibliaService;

  String _traducaoAtual = 'arc';
  Livro? _livroAtual;
  int _capituloAtual = 1;
  List<Versiculo> _versiculos = [];
  List<String> _textosVersiculos = [];
  bool _isLoading = true;
  String? _error;

  BibliaProvider(this._bibliaService);

  String get traducaoAtual => _traducaoAtual;
  Livro? get livroAtual => _livroAtual;
  int get capituloAtual => _capituloAtual;
  List<Versiculo> get versiculos => _versiculos;
  List<String> get textosVersiculos => _textosVersiculos;
  bool get isLoading => _isLoading;
  String? get error => _error;

  List<Livro> get livros => BibliaService.livros;
  List<Livro> get livrosAT =>
      livros.where((l) => l.testamento == 'AT').toList();
  List<Livro> get livrosNT =>
      livros.where((l) => l.testamento == 'NT').toList();

  Livro? livroPorAbreviacao(String abreviacao) {
    for (final l in livros) {
      if (l.abreviacao == abreviacao) return l;
    }
    return null;
  }

  Future<void> setTraducao(String traducao) async {
    if (traducao == _traducaoAtual) return;
    _traducaoAtual = traducao;
    notifyListeners();
    if (_livroAtual != null) {
      await carregarCapitulo(_livroAtual!.abreviacao, _capituloAtual);
    }
  }

  Future<void> selecionarLivro(String abreviacao) async {
    final livro = livroPorAbreviacao(abreviacao);
    if (livro == null) return;
    _livroAtual = livro;
    _capituloAtual = 1;
    notifyListeners();
    await carregarCapitulo(abreviacao, 1);
  }

  void carregarCapituloSync(String abreviacao, int capitulo) {
    _livroAtual = livroPorAbreviacao(abreviacao);
    _capituloAtual = capitulo;
    _textosVersiculos = _bibliaService.getTextosVersiculos(
      traducao: _traducaoAtual,
      livro: abreviacao,
      capitulo: capitulo,
    );
    if (_textosVersiculos.isEmpty && _traducaoAtual != 'arc') {
      _textosVersiculos = _bibliaService.getTextosVersiculos(
        traducao: 'arc',
        livro: abreviacao,
        capitulo: capitulo,
      );
    }
    _versiculos = List.generate(
      _textosVersiculos.length,
      (i) => Versiculo(
        numero: i + 1,
        texto: _textosVersiculos[i],
        traducao: _traducaoAtual,
        livro: abreviacao,
        capitulo: capitulo,
      ),
    );
    _isLoading = false;
  }

  Future<void> carregarCapitulo(String abreviacao, int capitulo) async {
    if (!BibliaService.isInitialized || BibliaService.livros.isEmpty) {
      await BibliaService.init();
    }
    await BibliaService.garantirTraducao(_traducaoAtual);
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      _textosVersiculos = _bibliaService.getTextosVersiculos(
        traducao: _traducaoAtual,
        livro: abreviacao,
        capitulo: capitulo,
      );
      if (_textosVersiculos.isEmpty) {
        _textosVersiculos = const ['[Carregando...]'];
      }
      _versiculos = List.generate(
        _textosVersiculos.length,
        (i) => Versiculo(
          numero: i + 1,
          texto: _textosVersiculos[i],
          traducao: _traducaoAtual,
          livro: abreviacao,
          capitulo: capitulo,
        ),
      );
      if (_livroAtual == null) {
        _livroAtual = livroPorAbreviacao(abreviacao);
      }
      _capituloAtual = capitulo;
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> proximoCapitulo() async {
    if (_livroAtual == null) return;
    if (_capituloAtual < _livroAtual!.capitulos) {
      await carregarCapitulo(_livroAtual!.abreviacao, _capituloAtual + 1);
    } else {
      final idx = livros.indexOf(_livroAtual!);
      if (idx < livros.length - 1) {
        final next = livros[idx + 1];
        _livroAtual = next;
        await carregarCapitulo(next.abreviacao, 1);
      }
    }
  }

  Future<void> capituloAnterior() async {
    if (_livroAtual == null) return;
    if (_capituloAtual > 1) {
      await carregarCapitulo(_livroAtual!.abreviacao, _capituloAtual - 1);
    } else {
      final idx = livros.indexOf(_livroAtual!);
      if (idx > 0) {
        final prev = livros[idx - 1];
        _livroAtual = prev;
        await carregarCapitulo(prev.abreviacao, prev.capitulos);
      }
    }
  }
}
