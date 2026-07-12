import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Flashcard {
  final int id;
  final String referencia;
  final String texto;
  final String? nota;
  bool conhecido;

  Flashcard({
    required this.id,
    required this.referencia,
    required this.texto,
    this.nota,
    this.conhecido = false,
  });
}

class FlashcardProvider extends ChangeNotifier {
  List<Flashcard> _flashcards = [];
  int _currentIndex = 0;
  bool _mostrarFrente = true;

  List<Flashcard> get flashcards => _flashcards;
  int get currentIndex => _currentIndex;
  bool get mostrarFrente => _mostrarFrente;
  Flashcard? get currentCard =>
      _flashcards.isNotEmpty ? _flashcards[_currentIndex] : null;
  int get totalCards => _flashcards.length;
  int get conhecidosCount => _flashcards.where((f) => f.conhecido).length;

  FlashcardProvider() {
    _carregarFlashcards();
  }

  Future<void> _carregarFlashcards() async {
    _flashcards = _mockFlashcards();
    notifyListeners();
  }

  List<Flashcard> _mockFlashcards() {
    return [
      Flashcard(
        id: 1,
        referencia: 'João 3:16',
        texto:
            'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      ),
      Flashcard(
        id: 2,
        referencia: 'Romanos 8:28',
        texto:
            'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
      ),
      Flashcard(
        id: 3,
        referencia: 'Filipenses 4:13',
        texto:
            'Posso todas as coisas naquele que me fortalece.',
      ),
      Flashcard(
        id: 4,
        referencia: 'Jeremias 29:11',
        texto:
            'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
      ),
      Flashcard(
        id: 5,
        referencia: 'Isaías 41:10',
        texto:
            'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
      ),
      Flashcard(
        id: 6,
        referencia: 'Salmos 119:105',
        texto:
            'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.',
      ),
      Flashcard(
        id: 7,
        referencia: 'Mateus 11:28',
        texto:
            'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.',
      ),
      Flashcard(
        id: 8,
        referencia: 'Provérbios 3:5-6',
        texto:
            'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
      ),
    ];
  }

  void inverterCard() {
    _mostrarFrente = !_mostrarFrente;
    notifyListeners();
  }

  void proximoCard() {
    if (_currentIndex < _flashcards.length - 1) {
      _currentIndex++;
      _mostrarFrente = true;
      notifyListeners();
    }
  }

  void anteriorCard() {
    if (_currentIndex > 0) {
      _currentIndex--;
      _mostrarFrente = true;
      notifyListeners();
    }
  }

  void marcarConhecido() {
    if (currentCard != null) {
      currentCard!.conhecido = true;
      if (_currentIndex < _flashcards.length - 1) {
        proximoCard();
      }
      notifyListeners();
    }
  }

  void resetarFlashcards() {
    for (final card in _flashcards) {
      card.conhecido = false;
    }
    _currentIndex = 0;
    _mostrarFrente = true;
    notifyListeners();
  }

  void embaralhar() {
    _flashcards.shuffle();
    _currentIndex = 0;
    _mostrarFrente = true;
    notifyListeners();
  }
}
