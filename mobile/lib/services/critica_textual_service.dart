import '../data/critica_textual_data.dart';

class CriticaTextualService {
  CriticaTextualService();

  List<VarianteTextual> getVariantes(String livro, int capitulo, int versiculo) {
    final porVersiculo = variantesData
        .where((v) => _match(v.referencia, livro, capitulo, versiculo))
        .toList();
    if (porVersiculo.isNotEmpty) return porVersiculo;
    final porLivro = variantesData
        .where((v) => v.referencia.split(':').first.toLowerCase() == livro.toLowerCase())
        .toList();
    if (porLivro.isNotEmpty) return porLivro;
    return variantesData;
  }
}

bool _match(String referencia, String livro, int capitulo, int versiculo) {
  final parts = referencia.split(':');
  if (parts.length < 3) return false;
  final rLivro = parts[0].toLowerCase();
  final rCap = int.tryParse(parts[1]) ?? -1;
  if (rLivro != livro.toLowerCase()) return false;
  if (rCap != capitulo) return false;
  final verPart = parts[2];
  if (verPart.contains('-')) {
    final range = verPart.split('-');
    final start = int.tryParse(range[0]) ?? -1;
    var end = int.tryParse(range[1]) ?? -1;
    if (end < start) end = start;
    return versiculo >= start && versiculo <= end;
  }
  final rVer = int.tryParse(verPart) ?? -1;
  return rVer == versiculo;
}
