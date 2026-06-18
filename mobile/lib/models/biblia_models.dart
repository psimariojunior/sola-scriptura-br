class Testamento {
  final int id;
  final String nome;
  final String? abreviacao;

  Testamento({
    required this.id,
    required this.nome,
    this.abreviacao,
  });

  factory Testamento.fromJson(Map<String, dynamic> json) {
    return Testamento(
      id: json['id'] as int,
      nome: json['nome'] as String,
      abreviacao: json['abreviacao'] as String?,
    );
  }
}

class Livro {
  final int id;
  final String nome;
  final String? abreviacao;
  final int? testamentoId;
  final int? capitulos;
  final int? ordem;

  Livro({
    required this.id,
    required this.nome,
    this.abreviacao,
    this.testamentoId,
    this.capitulos,
    this.ordem,
  });

  factory Livro.fromJson(Map<String, dynamic> json) {
    return Livro(
      id: json['id'] as int,
      nome: json['nome'] as String,
      abreviacao: json['abreviacao'] as String?,
      testamentoId: json['testamento_id'] as int?,
      capitulos: json['capitulos'] as int?,
      ordem: json['ordem'] as int?,
    );
  }
}

class Capitulo {
  final int id;
  final int numero;
  final int? livroId;
  final int? versiculos;

  Capitulo({
    required this.id,
    required this.numero,
    this.livroId,
    this.versiculos,
  });

  factory Capitulo.fromJson(Map<String, dynamic> json) {
    return Capitulo(
      id: json['id'] as int,
      numero: json['numero'] as int,
      livroId: json['livro_id'] as int?,
      versiculos: json['versiculos'] as int?,
    );
  }
}

class Versiculo {
  final int id;
  final int numero;
  final String texto;
  final int? capituloId;
  final int? livroId;
  final String? livroNome;
  final String? referencia;

  Versiculo({
    required this.id,
    required this.numero,
    required this.texto,
    this.capituloId,
    this.livroId,
    this.livroNome,
    this.referencia,
  });

  factory Versiculo.fromJson(Map<String, dynamic> json) {
    return Versiculo(
      id: json['id'] as int,
      numero: json['numero'] as int,
      texto: json['texto'] as String,
      capituloId: json['capitulo_id'] as int?,
      livroId: json['livro_id'] as int?,
      livroNome: json['livro_nome'] as String?,
      referencia: json['referencia'] as String?,
    );
  }
}

class Personagem {
  final int id;
  final String nome;
  final String? descricao;
  final String? epoca;
  final String? tipo;

  Personagem({
    required this.id,
    required this.nome,
    this.descricao,
    this.epoca,
    this.tipo,
  });

  factory Personagem.fromJson(Map<String, dynamic> json) {
    return Personagem(
      id: json['id'] as int,
      nome: json['nome'] as String,
      descricao: json['descricao'] as String?,
      epoca: json['epoca'] as String?,
      tipo: json['tipo'] as String?,
    );
  }
}

class Doutrina {
  final int id;
  final String nome;
  final String? descricao;
  final String? categoria;
  final String? tradicao;

  Doutrina({
    required this.id,
    required this.nome,
    this.descricao,
    this.categoria,
    this.tradicao,
  });

  factory Doutrina.fromJson(Map<String, dynamic> json) {
    return Doutrina(
      id: json['id'] as int,
      nome: json['nome'] as String,
      descricao: json['descricao'] as String?,
      categoria: json['categoria'] as String?,
      tradicao: json['tradicao'] as String?,
    );
  }
}

class Localizacao {
  final int id;
  final String nome;
  final String? descricao;
  final double? latitude;
  final double? longitude;
  final String? epoca;

  Localizacao({
    required this.id,
    required this.nome,
    this.descricao,
    this.latitude,
    this.longitude,
    this.epoca,
  });

  factory Localizacao.fromJson(Map<String, dynamic> json) {
    return Localizacao(
      id: json['id'] as int,
      nome: json['nome'] as String,
      descricao: json['descricao'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      epoca: json['epoca'] as String?,
    );
  }
}

class EventoHistorico {
  final int id;
  final String titulo;
  final String? descricao;
  final String? data;
  final String? periodo;

  EventoHistorico({
    required this.id,
    required this.titulo,
    this.descricao,
    this.data,
    this.periodo,
  });

  factory EventoHistorico.fromJson(Map<String, dynamic> json) {
    return EventoHistorico(
      id: json['id'] as int,
      titulo: json['titulo'] as String,
      descricao: json['descricao'] as String?,
      data: json['data'] as String?,
      periodo: json['periodo'] as String?,
    );
  }
}

class ResultadoPesquisa {
  final String? referencia;
  final String? texto;
  final String? livro;
  final int? capitulo;
  final int? versiculo;

  ResultadoPesquisa({
    this.referencia,
    this.texto,
    this.livro,
    this.capitulo,
    this.versiculo,
  });

  factory ResultadoPesquisa.fromJson(Map<String, dynamic> json) {
    return ResultadoPesquisa(
      referencia: json['referencia'] as String?,
      texto: json['texto'] as String?,
      livro: json['livro'] as String?,
      capitulo: json['capitulo'] as int?,
      versiculo: json['versiculo'] as int?,
    );
  }
}

class Favorito {
  final int id;
  final String referencia;
  final String texto;
  final String? nota;

  Favorito({
    required this.id,
    required this.referencia,
    required this.texto,
    this.nota,
  });

  factory Favorito.fromJson(Map<String, dynamic> json) {
    return Favorito(
      id: json['id'] as int,
      referencia: json['referencia'] as String,
      texto: json['texto'] as String,
      nota: json['nota'] as String?,
    );
  }
}

class Usuario {
  final int id;
  final String nome;
  final String email;

  Usuario({
    required this.id,
    required this.nome,
    required this.email,
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: json['id'] as int,
      nome: json['nome'] as String,
      email: json['email'] as String,
    );
  }
}
