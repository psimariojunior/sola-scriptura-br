import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FlashcardsScreen extends StatefulWidget {
  const FlashcardsScreen({super.key});

  @override
  State<FlashcardsScreen> createState() => _FlashcardsScreenState();
}

class _FlashcardsScreenState extends State<FlashcardsScreen>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  bool _mostrarFrente = true;
  late AnimationController _flipController;
  late Animation<double> _flipAnimation;

  final List<Map<String, dynamic>> _flashcards = [
    {
      'referencia': 'João 3:16',
      'texto':
          'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
      'conhecido': false,
    },
    {
      'referencia': 'Romanos 8:28',
      'texto':
          'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
      'conhecido': false,
    },
    {
      'referencia': 'Filipenses 4:13',
      'texto': 'Posso todas as coisas naquele que me fortalece.',
      'conhecido': false,
    },
    {
      'referencia': 'Jeremias 29:11',
      'texto':
          'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
      'conhecido': false,
    },
    {
      'referencia': 'Isaías 41:10',
      'texto':
          'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
      'conhecido': false,
    },
    {
      'referencia': 'Salmos 119:105',
      'texto': 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.',
      'conhecido': false,
    },
    {
      'referencia': 'Mateus 11:28',
      'texto':
          'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.',
      'conhecido': false,
    },
    {
      'referencia': 'Provérbios 3:5-6',
      'texto':
          'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
      'conhecido': false,
    },
  ];

  static const Color _accent = Color(0xFFC9A96E);

  @override
  void initState() {
    super.initState();
    _flipController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _flipAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _flipController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _flipController.dispose();
    super.dispose();
  }

  int get _conhecidos => _flashcards.where((f) => f['conhecido'] == true).length;

  void _inverter() {
    if (_mostrarFrente) {
      _flipController.forward();
    } else {
      _flipController.reverse();
    }
    setState(() => _mostrarFrente = !_mostrarFrente);
  }

  void _proximo() {
    if (_currentIndex < _flashcards.length - 1) {
      setState(() {
        _currentIndex++;
        _mostrarFrente = true;
      });
      _flipController.reset();
    }
  }

  void _anterior() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
        _mostrarFrente = true;
      });
      _flipController.reset();
    }
  }

  void _marcarConhecido() {
    setState(() {
      _flashcards[_currentIndex]['conhecido'] = true;
    });
    if (_currentIndex < _flashcards.length - 1) {
      _proximo();
    }
  }

  void _embaralhar() {
    _flashcards.shuffle();
    setState(() {
      _currentIndex = 0;
      _mostrarFrente = true;
    });
    _flipController.reset();
  }

  void _resetar() {
    for (final card in _flashcards) {
      card['conhecido'] = false;
    }
    setState(() {
      _currentIndex = 0;
      _mostrarFrente = true;
    });
    _flipController.reset();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

    final currentCard = _flashcards[_currentIndex];

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: surface,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: textSecondary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Flashcards',
          style: GoogleFonts.merriweather(
            color: textPrimary,
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          PopupMenuButton<String>(
            icon: Icon(Icons.more_vert_rounded, color: textSecondary),
            onSelected: (v) {
              switch (v) {
                case 'embaralhar':
                  _embaralhar();
                  break;
                case 'resetar':
                  _resetar();
                  break;
              }
            },
            itemBuilder: (_) => [
              PopupMenuItem(value: 'embaralhar', child: Text('Embaralhar')),
              PopupMenuItem(value: 'resetar', child: Text('Resetar progresso')),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          _buildProgressSection(textPrimary, textSecondary),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  const SizedBox(height: 16),
                  _buildCounter(textSecondary),
                  const SizedBox(height: 16),
                  Expanded(
                    child: GestureDetector(
                      onTap: _inverter,
                      child: AnimatedBuilder(
                        animation: _flipAnimation,
                        builder: (context, child) {
                          final angle = _flipAnimation.value * 3.14159;
                          final showFront = angle < 3.14159 / 2;
                          return Transform(
                            alignment: Alignment.center,
                            transform: Matrix4.identity()
                              ..setEntry(3, 2, 0.001)
                              ..rotateY(angle),
                            child: showFront
                                ? _buildFrontCard(currentCard, card, textPrimary, textSecondary)
                                : Transform(
                                    alignment: Alignment.center,
                                    transform: Matrix4.identity()..rotateY(3.14159),
                                    child: _buildBackCard(currentCard, card, textPrimary, textSecondary),
                                  ),
                          );
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildHint(textSecondary),
                  const SizedBox(height: 20),
                  _buildActionButtons(textPrimary, textSecondary),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressSection(Color textPrimary, Color textSecondary) {
    final progress = _flashcards.isNotEmpty ? _conhecidos / _flashcards.length : 0.0;
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 8),
      color: Theme.of(context).brightness == Brightness.dark
          ? const Color(0xFF12121E)
          : const Color(0xFFF0EDE6),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                '$_conhecidos de ${_flashcards.length} memorizados',
                style: TextStyle(fontSize: 13, color: textSecondary, fontWeight: FontWeight.w500),
              ),
              const Spacer(),
              Text(
                '${(progress * 100).toInt()}%',
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: _accent),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.grey.withOpacity(0.15),
              valueColor: const AlwaysStoppedAnimation<Color>(_accent),
              minHeight: 5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCounter(Color textSecondary) {
    return Text(
      '${_currentIndex + 1} / ${_flashcards.length}',
      style: TextStyle(fontSize: 13, color: textSecondary, fontWeight: FontWeight.w500),
    );
  }

  Widget _buildFrontCard(
    Map<String, dynamic> cardData,
    Color card,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: card,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: _accent.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
            color: _accent.withOpacity(0.08),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            decoration: BoxDecoration(
              color: _accent.withOpacity(0.12),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              cardData['referencia'],
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: _accent,
              ),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Toque para ver a resposta',
            style: TextStyle(fontSize: 13, color: textSecondary),
          ),
        ],
      ),
    );
  }

  Widget _buildBackCard(
    Map<String, dynamic> cardData,
    Color card,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: _accent.withOpacity(0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: _accent.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: _accent.withOpacity(0.12),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            cardData['referencia'],
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: _accent,
            ),
          ),
          const SizedBox(height: 20),
          Text(
            cardData['texto'],
            textAlign: TextAlign.center,
            style: GoogleFonts.merriweather(
              fontSize: 18,
              fontStyle: FontStyle.italic,
              color: textPrimary,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          Text(
            'Toque para voltar',
            style: TextStyle(fontSize: 13, color: textSecondary),
          ),
        ],
      ),
    );
  }

  Widget _buildHint(Color textSecondary) {
    return Text(
      _mostrarFrente ? 'Toque no card para ver a resposta' : 'Toque para voltar',
      style: TextStyle(fontSize: 13, color: textSecondary),
    );
  }

  Widget _buildActionButtons(Color textPrimary, Color textSecondary) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: _currentIndex > 0 ? _anterior : null,
            icon: Icon(Icons.arrow_back_rounded, size: 18, color: textSecondary),
            label: Text('Anterior', style: TextStyle(color: textSecondary)),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: Colors.grey.withOpacity(0.3)),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(vertical: 14),
            ),
          ),
        ),
        const SizedBox(width: 10),
        if (!_flashcards[_currentIndex]['conhecido'])
          Expanded(
            child: ElevatedButton.icon(
              onPressed: _marcarConhecido,
              icon: const Icon(Icons.check_rounded, size: 18, color: Colors.white),
              label: const Text('Sei de Cor', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF5D8A5D),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
                elevation: 0,
              ),
            ),
          )
        else
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 14),
              decoration: BoxDecoration(
                color: const Color(0xFF5D8A5D).withOpacity(0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Text(
                  '✓ Memorizado',
                  style: TextStyle(
                    color: Color(0xFF5D8A5D),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ),
        const SizedBox(width: 10),
        Expanded(
          child: ElevatedButton.icon(
            onPressed: _currentIndex < _flashcards.length - 1 ? _proximo : null,
            icon: const Icon(Icons.arrow_forward_rounded, size: 18, color: Colors.white),
            label: const Text('Próximo', style: TextStyle(color: Colors.white)),
            style: ElevatedButton.styleFrom(
              backgroundColor: _accent,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(vertical: 14),
              elevation: 0,
            ),
          ),
        ),
      ],
    );
  }
}
