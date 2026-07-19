import '../data/comentarios_data.dart';
import '../models/comentario.dart';

class ComentarioService {
  ComentarioService();

  List<Comentario> getComentariosPorVersiculo(
    String livro,
    int capitulo,
    int versiculo,
  ) {
    final ref = '$livro:$capitulo:$versiculo';
    final items = comentariosPorReferencia[ref] ?? comentariosPorReferencia['default'] ?? [];
    return items
        .asMap()
        .entries
        .map((entry) => Comentario(
              id: '${ref}-${entry.key}',
              versiculoRef: ref.toUpperCase(),
              autor: entry.value['autor'] as String,
              texto: entry.value['texto'] as String,
              fonte: entry.value['fonte'] as String?,
            ))
        .toList();
  }

  List<String> getAutores() {
    return const [
      'Matthew Henry',
      'Adam Clarke',
      'João Calvino',
      'John Gill',
      'Charles Spurgeon',
      'Albert Barnes',
    ];
  }
}
