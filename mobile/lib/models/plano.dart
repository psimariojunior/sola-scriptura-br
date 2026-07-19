class PlanoLeitura {
  final String id;
  final String nome;
  final String descricao;
  final int duracaoDias;
  final double progresso;
  final List<String> leiturasHoje;

  const PlanoLeitura({
    required this.id,
    required this.nome,
    required this.descricao,
    required this.duracaoDias,
    required this.progresso,
    required this.leiturasHoje,
  });
}
