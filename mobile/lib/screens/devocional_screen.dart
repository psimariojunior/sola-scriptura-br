import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DevocionalScreen extends StatefulWidget {
  const DevocionalScreen({super.key});

  @override
  State<DevocionalScreen> createState() => _DevocionalScreenState();
}

class _DevocionalScreenState extends State<DevocionalScreen> {
  int _currentIndex = 0;

  final List<Map<String, dynamic>> _devocionais = [
    {
      'titulo': 'A Graça Suficiente',
      'versiculoRef': '2 Coríntios 12:9',
      'versiculoTexto':
          'Mas ele me disse: "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza."',
      'reflexao':
          'Paulo implorou a Deus que removesse sua espinha na carne, mas Deus respondeu que Sua graça era suficiente. Quantas vezes buscamos a remoção dos problemas quando deveríamos buscar a graça para suportá-los? A suficiência da graça divina não depende das nossas circunstâncias, mas da fidelidade de Deus.',
      'oracao':
          'Senhor, ajuda-me a confiar na Tua graça suficiente em todos os momentos da minha vida. Que eu possa encontrar o Teu poder na minha fraqueza. Amém.',
      'cor': Color(0xFFC9A96E),
    },
    {
      'titulo': 'Caminhos de Justiça',
      'versiculoRef': 'Salmos 23:3',
      'versiculoTexto':
          'Ele restaura a minha alma. Guia-me pelos caminhos da justiça, por amor do seu nome.',
      'reflexao':
          'Deus não apenas nos sustenta, mas nos restaura e direciona. Os caminhos da justiça não são sempre os mais fáceis, mas são os que levam à vida plena. Como um bom pastor, Ele nos guia com cuidado e amor.',
      'oracao':
          'Pai, guia-me nos teus caminhos. Quando eu me desviar, restaura a minha alma e me conduz de volta ao teu caminho. Em nome de Jesus. Amém.',
      'cor': Color(0xFF4A6FA5),
    },
    {
      'titulo': 'A Promessa da Paz',
      'versiculoRef': 'João 14:27',
      'versiculoTexto':
          'Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbe o coração de vocês, nem tenham medo.',
      'reflexao':
          'A paz de Cristo é diferente da paz que o mundo oferece. A paz do mundo depende das circunstâncias, mas a paz de Cristo permanece em meio às tempestades. Ele nos dá uma paz que excede todo entendimento.',
      'oracao':
          'Jesus, concede-me a Tua paz que excede todo entendimento. Que meu coração não se perturbe, mas confie em Ti sempre. Amém.',
      'cor': Color(0xFF5D8A5D),
    },
    {
      'titulo': 'A Força na Adversidade',
      'versiculoRef': 'Isaías 40:31',
      'versiculoTexto':
          'Mas os que esperam no Senhor renovarão as suas forças. Correrão e não se cansarão, caminharão e não se fatigarão.',
      'reflexao':
          'A espera no Senhor não é passiva, mas ativa. É uma expectativa cheia de fé que nos renova diariamente. Quando parece que não temos mais forças, é exatamente aí que o poder de Deus se manifesta de forma mais completa.',
      'oracao':
          'Deus, fortalece-me quando eu estiver fraco. Renova as minhas forças e me dá perseverança para continuar confiando em Ti. Amém.',
      'cor': Color(0xFFE07A4A),
    },
    {
      'titulo': 'O Amor Incondicional',
      'versiculoRef': 'Romanos 8:38-39',
      'versiculoTexto':
          'Porque estou convencido de que nem a morte, nem a vida, nem os anjos, nem os demônios, nem o presente, nem o futuro, nem quaisquer poderes, nem a altura, nem a profundidade, nem qualquer outra coisa na criação poderá nos separar do amor de Deus.',
      'reflexao':
          'Nada pode nos separar do amor de Deus. Nem nossos erros, nem nossas dúvidas, nem as circunstâncias mais difíceis. O amor de Deus é incondicional, eterno e inabalável. Isso nos dá segurança e esperança para enfrentar qualquer desafio.',
      'oracao':
          'Pai, obrigado pelo Teu amor que nada pode separar. Que eu possa viver cada dia consciente desse amor incomparável e compartilhá-lo com os outros. Amém.',
      'cor': Color(0xFF8B5A3C),
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A14) : const Color(0xFFF8F6F0);
    final card = isDark ? const Color(0xFF1A1A2E) : Colors.white;
    final surface = isDark ? const Color(0xFF12121E) : const Color(0xFFF0EDE6);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A2E);
    final textSecondary = isDark ? Colors.white54 : const Color(0xFF6B7280);

    final devocional = _devocionais[_currentIndex];
    final cor = devocional['cor'] as Color;

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
          'Devocional Diário',
          style: GoogleFonts.merriweather(
            color: textPrimary,
            fontSize: 17,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share_rounded, color: textSecondary),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          _buildPageIndicator(textSecondary, cor),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: cor.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'Devocional ${_currentIndex + 1} de ${_devocionais.length}',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: cor,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Center(
                    child: Text(
                      devocional['titulo'],
                      textAlign: TextAlign.center,
                      style: GoogleFonts.merriweather(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: textPrimary,
                        height: 1.3,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: cor.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: cor.withOpacity(0.2)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.menu_book_rounded, color: cor, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              devocional['versiculoRef'],
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                                color: cor,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          devocional['versiculoTexto'],
                          style: GoogleFonts.merriweather(
                            fontSize: 16,
                            fontStyle: FontStyle.italic,
                            color: textPrimary,
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),
                  _buildSectionTitle('Reflexão', textSecondary),
                  const SizedBox(height: 12),
                  Text(
                    devocional['reflexao'],
                    style: TextStyle(
                      fontSize: 15,
                      color: textPrimary,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 28),
                  _buildSectionTitle('Oração', textSecondary),
                  const SizedBox(height: 12),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: card,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.grey.withOpacity(0.15)),
                    ),
                    child: Text(
                      devocional['oracao'],
                      style: TextStyle(
                        fontSize: 15,
                        fontStyle: FontStyle.italic,
                        color: textPrimary,
                        height: 1.6,
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
          _buildNavigationBar(bg, surface, textPrimary, textSecondary),
        ],
      ),
    );
  }

  Widget _buildPageIndicator(Color textSecondary, Color cor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(
          _devocionais.length,
          (index) => AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            margin: const EdgeInsets.symmetric(horizontal: 3),
            width: _currentIndex == index ? 24 : 8,
            height: 8,
            decoration: BoxDecoration(
              color: _currentIndex == index ? cor : textSecondary.withOpacity(0.2),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, Color textSecondary) {
    return Text(
      title.toUpperCase(),
      style: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.w700,
        color: textSecondary,
        letterSpacing: 1.5,
      ),
    );
  }

  Widget _buildNavigationBar(
    Color bg,
    Color surface,
    Color textPrimary,
    Color textSecondary,
  ) {
    return Container(
      padding: EdgeInsets.fromLTRB(
        20,
        12,
        20,
        MediaQuery.of(context).padding.bottom + 12,
      ),
      decoration: BoxDecoration(
        color: surface,
        border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.15), width: 0.5)),
      ),
      child: Row(
        children: [
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _currentIndex > 0
                  ? () => setState(() => _currentIndex--)
                  : null,
              icon: Icon(Icons.arrow_back_rounded, size: 18, color: textSecondary),
              label: Text('Anterior', style: TextStyle(color: textSecondary)),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.grey.withOpacity(0.3)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: ElevatedButton.icon(
              onPressed: _currentIndex < _devocionais.length - 1
                  ? () => setState(() => _currentIndex++)
                  : null,
              icon: const Icon(Icons.arrow_forward_rounded, size: 18, color: Colors.white),
              label: const Text('Próximo', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFC9A96E),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
                elevation: 0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
