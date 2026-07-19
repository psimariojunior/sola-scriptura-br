import '../data/introducoes_data.dart';

class IntroducoesService {
  IntroducoesService();

  IntroducaoLivro? getIntroducao(String livro) {
    final key = livro.toLowerCase();
    if (introducoesData.containsKey(key)) return introducoesData[key];
    for (final entry in introducoesData.entries) {
      if (entry.value.livro == key) return entry.value;
      if (entry.value.livro.toLowerCase() == key) return entry.value;
    }
    return null;
  }
}
