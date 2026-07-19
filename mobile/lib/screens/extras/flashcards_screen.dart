import 'package:flutter/material.dart';

class _Flashcard {
  final String frente;
  final String verso;
  final String categoria;

  const _Flashcard({
    required this.frente,
    required this.verso,
    required this.categoria,
  });
}

class _Baralho {
  final String nome;
  final String descricao;
  final List<_Flashcard> cartas;

  const _Baralho({required this.nome, required this.descricao, required this.cartas});
}

const _baralhos = [
  _Baralho(
    nome: 'Versículos Chave',
    descricao: 'Versículos memoráveis da Bíblia',
    cartas: [
      _Flashcard(frente: 'João 3:16', verso: 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo o que crer nele não pereça, mas tenha a vida eterna.', categoria: 'Versículos'),
      _Flashcard(frente: 'Salmo 23:1', verso: 'O Senhor é o meu pastor; nada me faltará.', categoria: 'Versículos'),
      _Flashcard(frente: 'Romanos 8:28', verso: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.', categoria: 'Versículos'),
      _Flashcard(frente: 'Filipenses 4:13', verso: 'Posso todas as coisas naquele que me fortalece.', categoria: 'Versículos'),
      _Flashcard(frente: 'Isaías 41:10', verso: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.', categoria: 'Versículos'),
    ],
  ),
  _Baralho(
    nome: 'Personagens do AT',
    descricao: 'Principais personagens do Antigo Testamento',
    cartas: [
      _Flashcard(frente: 'Quem construiu a arca?', verso: 'Noé (Gênesis 6-9)', categoria: 'Personagens AT'),
      _Flashcard(frente: 'Quem recebeu os 10 mandamentos?', verso: 'Moisés no Monte Sinai (Êxodo 20)', categoria: 'Personagens AT'),
      _Flashcard(frente: 'Quem foi o primeiro rei?', verso: 'Saul, ungido por Samuel (1 Samuel 10)', categoria: 'Personagens AT'),
      _Flashcard(frente: 'Quem matou Golias?', verso: 'Davi com uma pedra e funda (1 Samuel 17)', categoria: 'Personagens AT'),
      _Flashcard(frente: 'Quem foi jogado na fossa dos leões?', verso: 'Daniel (Daniel 6)', categoria: 'Personagens AT'),
    ],
  ),
  _Baralho(
    nome: 'Personagens do NT',
    descricao: 'Principais personagens do Novo Testamento',
    cartas: [
      _Flashcard(frente: 'Quem negou Jesus 3 vezes?', verso: 'Pedro (Mateus 26:69-75)', categoria: 'Personagens NT'),
      _Flashcard(frente: 'Quem perseguia a igreja e se converteu?', verso: 'Saulo/Paulo (Atos 9)', categoria: 'Personagens NT'),
      _Flashcard(frente: 'Quem batizou Jesus?', verso: 'João Batista no rio Jordão (Mateus 3)', categoria: 'Personagens NT'),
      _Flashcard(frente: 'Quem era o discípulo amado?', verso: 'João (João 13:23)', categoria: 'Personagens NT'),
      _Flashcard(frente: 'Quem levou Jesus na cruz?', verso: 'Simão de Cirene (Mateus 27:32)', categoria: 'Personagens NT'),
    ],
  ),
  _Baralho(
    nome: 'Doutrinas',
    descricao: 'Conceitos teológicos fundamentais',
    cartas: [
      _Flashcard(frente: 'O que é justificação?', verso: 'Ato de Deus pelo qual o pecador é declarado justo pela fé em Jesus (Romanos 5:1).', categoria: 'Doutrina'),
      _Flashcard(frente: 'O que é santificação?', verso: 'Processo de ser tornado santo pelo Espírito Santo (1 Tessalonicenses 4:3).', categoria: 'Doutrina'),
      _Flashcard(frente: 'O que é a trindade?', verso: 'Deus em três pessoas: Pai, Filho e Espírito Santo, uma só essência (Mateus 28:19).', categoria: 'Doutrina'),
      _Flashcard(frente: 'O que é arrependimento?', verso: 'Mudança de mente e direção que leva ao perdão dos pecados (Atos 3:19).', categoria: 'Doutrina'),
      _Flashcard(frente: 'O que é graça?', verso: 'Favor imerecido de Deus. Salvação pela graça, não por obras (Efésios 2:8-9).', categoria: 'Doutrina'),
    ],
  ),
];

class FlashcardsScreen extends StatefulWidget {
  const FlashcardsScreen({super.key});

  @override
  State<FlashcardsScreen> createState() => _FlashcardsScreenState();
}

class _FlashcardsScreenState extends State<FlashcardsScreen> {
  _Baralho? _baralhoEmUso;
  int _indiceAtual = 0;
  bool _virado = false;
  final Map<int, bool> _progresso = {};

  @override
  Widget build(BuildContext context) {
    if (_baralhoEmUso != null) {
      return _telaFlashcard();
    }
    return _telaBaralhos();
  }

  Widget _telaBaralhos() {
    return Scaffold(
      appBar: AppBar(title: const Text('Flashcards')),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: _baralhos.length,
        itemBuilder: (context, index) {
          final b = _baralhos[index];
          final respondidos = _progresso.length;
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              contentPadding: const EdgeInsets.all(16),
              leading: Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.style, color: Theme.of(context).colorScheme.primary),
              ),
              title: Text(b.nome, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4),
                  Text(b.descricao),
                  const SizedBox(height: 6),
                  LinearProgressIndicator(
                    value: b.cartas.isNotEmpty ? respondidos / b.cartas.length : 0,
                    minHeight: 4,
                  ),
                ],
              ),
              isThreeLine: true,
              trailing: const Icon(Icons.chevron_right),
              onTap: () => setState(() {
                _baralhoEmUso = b;
                _indiceAtual = 0;
                _virado = false;
                _progresso.clear();
              }),
            ),
          );
        },
      ),
    );
  }

  Widget _telaFlashcard() {
    final cartas = _baralhoEmUso!.cartas;
    final total = cartas.length;

    if (_indiceAtual >= total) {
      return _telaConclusao();
    }

    final carta = cartas[_indiceAtual];
    final progresso = (_indiceAtual + 1) / total;

    return Scaffold(
      appBar: AppBar(
        title: Text(_baralhoEmUso!.nome),
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => setState(() {
              _baralhoEmUso = null;
              _progresso.clear();
            }),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Text('${_indiceAtual + 1}/$total'),
                const SizedBox(width: 12),
                Expanded(child: LinearProgressIndicator(value: progresso)),
              ],
            ),
          ),
          Expanded(
            child: GestureDetector(
              onTap: () => setState(() => _virado = !_virado),
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 400),
                transitionBuilder: (child, anim) => ScaleTransition(scale: anim, child: child),
                child: Card(
                  key: ValueKey('$_indiceAtual-$_virado'),
                  margin: const EdgeInsets.symmetric(horizontal: 24),
                  elevation: 4,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.primaryContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            _virado ? 'Resposta' : 'Pergunta',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        Text(
                          _virado ? carta.verso : carta.frente,
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Toque para ${_virado ? 'ver a pergunta' : 'ver a resposta'}',
                          style: TextStyle(
                            fontSize: 12,
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          if (_virado)
            Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _proximaCarta(false),
                      icon: const Icon(Icons.close),
                      label: const Text('Não sei'),
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size(0, 56),
                        foregroundColor: Colors.red,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () => _proximaCarta(true),
                      icon: const Icon(Icons.check),
                      label: const Text('Sei'),
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size(0, 56),
                        backgroundColor: Colors.green,
                      ),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  void _proximaCarta(bool sabia) {
    setState(() {
      _progresso[_indiceAtual] = sabia;
      _indiceAtual++;
      _virado = false;
    });
  }

  Widget _telaConclusao() {
    final total = _baralhoEmUso!.cartas.length;
    final sabidos = _progresso.values.where((v) => v).length;

    return Scaffold(
      appBar: AppBar(
        title: Text(_baralhoEmUso!.nome),
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => setState(() {
              _baralhoEmUso = null;
              _progresso.clear();
            }),
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                sabidos == total ? Icons.celebration : Icons.thumb_up,
                size: 80,
                color: sabidos == total ? Colors.amber : Colors.green,
              ),
              const SizedBox(height: 20),
              const Text(
                'Baralho concluído!',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
              ),
              const SizedBox(height: 12),
              Text(
                'Você sabe $sabidos de $total cartas',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => setState(() {
                    _indiceAtual = 0;
                    _virado = false;
                    _progresso.clear();
                  }),
                  icon: const Icon(Icons.replay),
                  label: const Text('Estudar novamente'),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () => setState(() {
                    _baralhoEmUso = null;
                    _progresso.clear();
                  }),
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Voltar aos baralhos'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
