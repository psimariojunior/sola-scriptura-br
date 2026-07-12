import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DevocionalProvider extends ChangeNotifier {
  List<Devocional> _devocionais = [];
  List<Devocional> get devocionais => _devocionais;

  Devocional? _devocionalDiario;
  Devocional? get devocionalDiario => _devocionalDiario;

  DevocionalProvider() {
    _carregarDevocionais();
  }

  Future<void> _carregarDevocionais() async {
    _devocionais = _mockDevocionais();
    _devocionalDiario = _devocionais.isNotEmpty ? _devocionais.first : null;
    notifyListeners();
  }

  List<Devocional> _mockDevocionais() {
    return [
      Devocional(
        id: 1,
        titulo: 'A Graça Suficiente',
        versiculoReferencia: '2 Coríntios 12:9',
        versiculoTexto:
            'Mas ele me disse: "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza."',
        reflexao:
            'Paulo implorou a Deus que removesse sua espinha na carne, mas Deus respondeu que Sua graça era suficiente. Quantas vezes buscamos a remoção dos problemas quando deveríamos buscar a graça para suportá-los?',
        oracao:
            'Senhor, ajuda-me a confiar na Tua graça suficiente em todos os momentos da minha vida. Que eu possa encontrar o Teu poder na minha fraqueza.',
        data: DateTime.now(),
        cor: Color(0xFFC9A96E),
      ),
      Devocional(
        id: 2,
        titulo: 'Caminhos de Justiça',
        versiculoReferencia: 'Salmos 23:3',
        versiculoTexto:
            'Ele restaura a minha alma. Guia-me pelos caminhos da justiça, por amor do seu nome.',
        reflexao:
            'Deus não apenas nos sustenta, mas nos restaura e direciona. Os caminhos da justiça não são sempre os mais fáceis, mas são os que levam à vida plena.',
        oracao:
            'Pai, guia-me nos teus caminhos. Quando eu me desviar, restaura a minha alma e me conduz de volta ao teu caminho.',
        data: DateTime.now().subtract(const Duration(days: 1)),
        cor: Color(0xFF4A6FA5),
      ),
      Devocional(
        id: 3,
        titulo: 'A Promessa da Paz',
        versiculoReferencia: 'João 14:27',
        versiculoTexto:
            'Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbe o coração de vocês, nem tenham medo.',
        reflexao:
            'A paz de Cristo é diferente da paz que o mundo oferece. A paz do mundo depende das circunstâncias, mas a paz de Cristo permanece em meio às tempestades.',
        oracao:
            'Jesus, concede-me a Tua paz que excede todo entendimento. Que meu coração não se perturbe, mas confie em Ti.',
        data: DateTime.now().subtract(const Duration(days: 2)),
        cor: Color(0xFF5D8A5D),
      ),
    ];
  }

  Future<void> marcarLida(int id) async {
    final index = _devocionais.indexWhere((d) => d.id == id);
    if (index != -1) {
      _devocionais[index].lida = true;
      notifyListeners();
    }
  }
}

class Devocional {
  final int id;
  final String titulo;
  final String versiculoReferencia;
  final String versiculoTexto;
  final String reflexao;
  final String oracao;
  final DateTime data;
  final Color cor;
  bool lida;

  Devocional({
    required this.id,
    required this.titulo,
    required this.versiculoReferencia,
    required this.versiculoTexto,
    required this.reflexao,
    required this.oracao,
    required this.data,
    required this.cor,
    this.lida = false,
  });
}
