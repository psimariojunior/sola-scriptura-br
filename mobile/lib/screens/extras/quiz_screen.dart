import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';

class _Pergunta {
  final String pergunta;
  final List<String> opcoes;
  final int correta;
  final String categoria;

  const _Pergunta({
    required this.pergunta,
    required this.opcoes,
    required this.correta,
    required this.categoria,
  });
}

const _perguntas = [
  _Pergunta(
    pergunta: 'Quem construiu a arca?',
    opcoes: ['Abraão', 'Noé', 'Moisés', 'Davi'],
    correta: 1,
    categoria: 'Antigo Testamento',
  ),
  _Pergunta(
    pergunta: 'Qual o primeiro milagre de Jesus?',
    opcoes: ['Cura do cego', 'Ressurreição de Lázaro', 'Água em vinho', 'Multiplicação dos pães'],
    correta: 2,
    categoria: 'Novo Testamento',
  ),
  _Pergunta(
    pergunta: 'Quantos mandamentos Deus deu no Sinai?',
    opcoes: ['5', '7', '10', '12'],
    correta: 2,
    categoria: 'Antigo Testamento',
  ),
  _Pergunta(
    pergunta: 'Quem traiu Jesus com 30 moedas?',
    opcoes: ['Pedro', 'Judas', 'Tomé', 'André'],
    correta: 1,
    categoria: 'Personagens',
  ),
  _Pergunta(
    pergunta: 'Qual o livro mais longo da Bíblia?',
    opcoes: ['Gênesis', 'Salmos', 'Isaías', 'Atos'],
    correta: 1,
    categoria: 'Bíblia Geral',
  ),
  _Pergunta(
    pergunta: 'Quem foi engolido por um grande peixe?',
    opcoes: ['Elias', 'Jonas', 'Pedro', 'Paulo'],
    correta: 1,
    categoria: 'Antigo Testamento',
  ),
  _Pergunta(
    pergunta: 'Em que cidade Jesus nasceu?',
    opcoes: ['Nazareto', 'Jerusalém', 'Belém', 'Cafarnaum'],
    correta: 2,
    categoria: 'Novo Testamento',
  ),
  _Pergunta(
    pergunta: 'Quantos discípulos Jesus escolheu?',
    opcoes: ['7', '10', '12', '24'],
    correta: 2,
    categoria: 'Personagens',
  ),
  _Pergunta(
    pergunta: 'Qual é o primeiro livro do Novo Testamento?',
    opcoes: ['Marcos', 'Mateus', 'Lucas', 'João'],
    correta: 1,
    categoria: 'Bíblia Geral',
  ),
  _Pergunta(
    pergunta: 'Quem foi o primeiro rei de Israel?',
    opcoes: ['Davi', 'Saul', 'Salomão', 'Josué'],
    correta: 1,
    categoria: 'Antigo Testamento',
  ),
  _Pergunta(
    pergunta: 'De quem Jesus nasceu?',
    opcoes: ['Maria e José', 'Isabel e Zacarias', 'Ana e Elias', 'Rute e Boaz'],
    correta: 0,
    categoria: 'Novo Testamento',
  ),
  _Pergunta(
    pergunta: 'Qual o fruto do Espírito?',
    opcoes: ['Riquezas e poder', 'Amor, alegria, paz', 'Sabedoria e ciência', 'Força e beleza'],
    correta: 1,
    categoria: 'Doutrina',
  ),
  _Pergunta(
    pergunta: 'Quem libertou Israel do Egito?',
    opcoes: ['Josué', 'Moisés', 'Davi', 'Abraão'],
    correta: 1,
    categoria: 'Antigo Testamento',
  ),
  _Pergunta(
    pergunta: 'Qual apóstolo foi chamado de "pedra"?',
    opcoes: ['Paulo', 'Pedro', 'Tiago', 'João'],
    correta: 1,
    categoria: 'Personagens',
  ),
  _Pergunta(
    pergunta: 'Onde Jesus foi crucificado?',
    opcoes: ['Getsemane', 'Sinai', 'Gólgota', 'Sion'],
    correta: 2,
    categoria: 'Novo Testamento',
  ),
];

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  String? _categoriaSelecionada;
  int _indiceAtual = 0;
  int _pontuacao = 0;
  bool _respondido = false;
  int? _respostaSelecionada;
  bool _emAndamento = false;
  int _tempoRestante = 15;
  Timer? _timer;
  List<_Pergunta> _perguntasEmbaralhadas = [];
  final List<int> _historico = [];

  static const _categorias = [
    'Todos',
    'Antigo Testamento',
    'Novo Testamento',
    'Personagens',
    'Bíblia Geral',
    'Doutrina',
  ];

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  List<_Pergunta> get _perguntasFiltradas {
    if (_categoriaSelecionada == null || _categoriaSelecionada == 'Todos') {
      return _perguntas;
    }
    return _perguntas.where((p) => p.categoria == _categoriaSelecionada).toList();
  }

  void _iniciarQuiz() {
    final filtradas = _perguntasFiltradas;
    _perguntasEmbaralhadas = List.from(filtradas)..shuffle();
    setState(() {
      _indiceAtual = 0;
      _pontuacao = 0;
      _emAndamento = true;
      _respondido = false;
      _respostaSelecionada = null;
      _historico.clear();
    });
    _iniciarTimer();
  }

  void _iniciarTimer() {
    _tempoRestante = 15;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_tempoRestante > 0) {
        setState(() => _tempoRestante--);
      } else {
        timer.cancel();
        if (!_respondido) {
          _verificarResposta(-1);
        }
      }
    });
  }

  void _verificarResposta(int indice) {
    if (_respondido) return;
    _timer?.cancel();
    final correta = _perguntasEmbaralhadas[_indiceAtual].correta;
    final acertou = indice == correta;

    setState(() {
      _respondido = true;
      _respostaSelecionada = indice;
      if (acertou) _pontuacao++;
      _historico.add(acertou ? 1 : 0);
    });

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        if (_indiceAtual < _perguntasEmbaralhadas.length - 1) {
          setState(() {
            _indiceAtual++;
            _respondido = false;
            _respostaSelecionada = null;
          });
          _iniciarTimer();
        } else {
          _timer?.cancel();
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_emAndamento) {
      return _telaInicio();
    }

    if (_indiceAtual >= _perguntasEmbaralhadas.length) {
      return _telaResultado();
    }

    return _telaQuiz();
  }

  Widget _telaInicio() {
    return Scaffold(
      appBar: AppBar(title: const Text('Quiz Bíblico')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Icon(Icons.quiz, size: 80, color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 20),
          Text(
            'Teste seus conhecimentos!',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            '${_perguntas.length} perguntas sobre a Bíblia',
            textAlign: TextAlign.center,
            style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
          ),
          const SizedBox(height: 30),
          const Text('Categoria:', style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _categorias.map((c) {
              final selecionado = (_categoriaSelecionada == null && c == 'Todos') ||
                  _categoriaSelecionada == c;
              return ChoiceChip(
                label: Text(c),
                selected: selecionado,
                onSelected: (_) => setState(() {
                  _categoriaSelecionada = c == 'Todos' ? null : c;
                }),
              );
            }).toList(),
          ),
          const SizedBox(height: 30),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: _iniciarQuiz,
              icon: const Icon(Icons.play_arrow),
              label: const Text('Iniciar Quiz'),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 56),
                textStyle: const TextStyle(fontSize: 18),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _telaQuiz() {
    final p = _perguntasEmbaralhadas[_indiceAtual];
    final progresso = (_indiceAtual + 1) / _perguntasEmbaralhadas.length;

    return Scaffold(
      appBar: AppBar(
        title: Text('Pergunta ${_indiceAtual + 1}/${_perguntasEmbaralhadas.length}'),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Text(
                '$_pontuacao pts',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          LinearProgressIndicator(value: progresso, minHeight: 4),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Icon(Icons.timer, color: _tempoRestante <= 5 ? Colors.red : Colors.grey, size: 20),
                const SizedBox(width: 4),
                Text(
                  '$_tempoRestante s',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: _tempoRestante <= 5 ? Colors.red : null,
                  ),
                ),
                const Spacer(),
                Text(
                  p.categoria,
                  style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.onSurfaceVariant),
                ),
              ],
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    p.pergunta,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  ...List.generate(p.opcoes.length, (i) {
                    Color? cor;
                    if (_respondido) {
                      if (i == p.correta) {
                        cor = Colors.green;
                      } else if (i == _respostaSelecionada) {
                        cor = Colors.red;
                      }
                    }
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: OutlinedButton(
                        onPressed: _respondido ? null : () => _verificarResposta(i),
                        style: OutlinedButton.styleFrom(
                          minimumSize: const Size(double.infinity, 56),
                          backgroundColor: cor?.withOpacity(0.1),
                          side: BorderSide(color: cor ?? Theme.of(context).dividerColor),
                        ),
                        child: Text(
                          p.opcoes[i],
                          style: TextStyle(
                            color: cor != null ? cor : null,
                            fontWeight: cor != null ? FontWeight.bold : null,
                          ),
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _telaResultado() {
    final total = _perguntasEmbaralhadas.length;
    final percentual = total > 0 ? (_pontuacao / total * 100).round() : 0;

    return Scaffold(
      appBar: AppBar(title: const Text('Resultado')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                percentual >= 70 ? Icons.emoji_events : percentual >= 40 ? Icons.thumb_up : Icons.sentiment_dissatisfied,
                size: 80,
                color: percentual >= 70 ? Colors.amber : percentual >= 40 ? Colors.green : Colors.orange,
              ),
              const SizedBox(height: 20),
              Text(
                '$_pontuacao / $total',
                style: Theme.of(context).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                '$percentual% de acerto',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              Text(
                percentual >= 70 ? 'Excelente!' : percentual >= 40 ? 'Bom trabalho!' : 'Continue estudando!',
                style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => setState(() => _emAndamento = false),
                  icon: const Icon(Icons.replay),
                  label: const Text('Jogar novamente'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
