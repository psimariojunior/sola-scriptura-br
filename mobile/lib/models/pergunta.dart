class PerguntaQuiz {
  final String pergunta;
  final List<String> opcoes;
  final int correta;
  final String categoria;
  final String? explicacao;

  const PerguntaQuiz({
    required this.pergunta,
    required this.opcoes,
    required this.correta,
    required this.categoria,
    this.explicacao,
  });
}
